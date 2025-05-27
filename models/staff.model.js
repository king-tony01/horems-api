import pool from "../config/db.js";

export default class Staff {
  static async getAll() {
    const [rows] = await pool.query("SELECT * FROM staff ORDER BY id DESC");
    return rows;
  }

  static async create({ staff_name, staff_role, shift_time }) {
    const conn = await pool.getConnection();
    try {
      await conn.beginTransaction();
      const [result] = await conn.query(
        "INSERT INTO staff (staff_name, staff_role, shift_time) VALUES (?, ?, ?)",
        [staff_name, staff_role, shift_time]
      );
      await conn.commit();
      return { id: result.insertId, staff_name, staff_role, shift_time };
    } catch (err) {
      await conn.rollback();
      throw err;
    } finally {
      conn.release();
    }
  }

  static async update(id, { staff_name, staff_role, shift_time }) {
    const conn = await pool.getConnection();
    try {
      await conn.beginTransaction();
      await conn.query(
        "UPDATE staff SET staff_name = ?, staff_role = ?, shift_time = ? WHERE id = ?",
        [staff_name, staff_role, shift_time, id]
      );
      await conn.commit();
      return { id, staff_name, staff_role, shift_time };
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
      await conn.query("DELETE FROM staff WHERE id = ?", [id]);
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
