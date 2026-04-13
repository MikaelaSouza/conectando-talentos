// Cliente Supabase leve usando fetch nativo (sem SDK pesado)
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY;

function headers() {
  return {
    'Content-Type': 'application/json',
    'apikey': SUPABASE_KEY,
    'Authorization': `Bearer ${SUPABASE_KEY}`,
    'Prefer': 'return=representation'
  };
}

class Query {
  constructor(table) {
    this.table = table;
    this._filters = [];
    this._select = '*';
    this._order = null;
    this._single = false;
    this._body = null;
    this._method = 'GET';
    this._upsertConflict = null;
    this._prefer = 'return=representation';
  }

  select(cols = '*') { this._select = cols; return this; }
  eq(col, val) { this._filters.push(`${col}=eq.${encodeURIComponent(val)}`); return this; }
  ilike(col, val) { this._filters.push(`${col}=ilike.${encodeURIComponent(val)}`); return this; }
  order(col, { ascending = true } = {}) { this._order = `${col}.${ascending ? 'asc' : 'desc'}`; return this; }
  single() { this._single = true; return this; }

  insert(body) { this._method = 'POST'; this._body = Array.isArray(body) ? body : [body]; return this; }
  upsert(body, { onConflict } = {}) {
    this._method = 'POST';
    this._body = Array.isArray(body) ? body : [body];
    this._prefer = `resolution=merge-duplicates,return=representation`;
    if (onConflict) this._upsertConflict = onConflict;
    return this;
  }
  delete() { this._method = 'DELETE'; this._prefer = 'return=representation'; return this; }

  async _run() {
    let url = `${SUPABASE_URL}/rest/v1/${this.table}?select=${encodeURIComponent(this._select)}`;
    if (this._filters.length) url += '&' + this._filters.join('&');
    if (this._order) url += `&order=${this._order}`;
    if (this._upsertConflict) url += `&on_conflict=${this._upsertConflict}`;

    const h = { ...headers(), 'Prefer': this._prefer };
    const opts = { method: this._method, headers: h };
    if (this._body) opts.body = JSON.stringify(this._body);

    const res = await fetch(url, opts);
    const text = await res.text();
    let data = text ? JSON.parse(text) : null;

    if (!res.ok) {
      const err = data || { message: text };
      err.code = err.code || String(res.status);
      return { data: null, error: err };
    }

    if (this._single) {
      if (Array.isArray(data)) {
        if (data.length === 0) return { data: null, error: { code: 'PGRST116', message: 'Not found' } };
        data = data[0];
      }
    }
    return { data, error: null };
  }

  then(resolve, reject) { return this._run().then(resolve, reject); }
}

const supabase = {
  from(table) { return new Query(table); }
};

module.exports = supabase;
