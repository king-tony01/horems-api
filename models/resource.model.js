import pool from "../config/db.js";

export default class Resource {
  static async getAll() {
    const [rows] = await pool.query("SELECT * FROM resources ORDER BY id DESC");
    return rows;
  }

  static async create({ resource_type, available = true, quantity = 1 }) {
    const conn = await pool.getConnection();
    try {
      await conn.beginTransaction();
      const [result] = await conn.query(
        "INSERT INTO resources (resource_type, available, quantity) VALUES (?, ?, ?)",
        [resource_type, available, quantity]
      );
      await conn.commit();
      return { id: result.insertId, resource_type, available, quantity };
    } catch (err) {
      await conn.rollback();
      throw err;
    } finally {
      conn.release();
    }
  }

  static async update(id, { resource_type, available, quantity }) {
    const conn = await pool.getConnection();
    try {
      await conn.beginTransaction();
      await conn.query(
        "UPDATE resources SET resource_type = ?, available = ?, quantity = ? WHERE id = ?",
        [resource_type, available, quantity, id]
      );
      await conn.commit();
      return { id, resource_type, available, quantity };
    } catch (err) {
      await conn.rollback();
      throw err;
    } finally {
      conn.release();
    }
  }

  static async delete(id) {
    const conn = await pool.getConnection();
    try {
      await conn.beginTransaction();
      await conn.query("DELETE FROM resources WHERE id = ?", [id]);
      await conn.commit();
      return { id };
    } catch (err) {
      await conn.rollback();
      throw err;
    } finally {
      conn.release();
    }
  }
}
