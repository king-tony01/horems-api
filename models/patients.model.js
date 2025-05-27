import pool from "../config/db.js";
export default class Patient {
  static async getAll() {
    const [rows] = await pool.query(
      "SELECT * FROM patients ORDER BY created_at DESC"
    );
    return rows;
  }

  static async create({ patient_name, age, patient_condition }) {
    const conn = await pool.getConnection();
    try {
      await conn.beginTransaction();
      const [result] = await conn.query(
        "INSERT INTO patients (patient_name, age, patient_condition) VALUES (?, ?, ?)",
        [patient_name, age, patient_condition]
      );
      await conn.commit();
      return { id: result.insertId, patient_name, age, patient_condition };
    } catch (err) {
      await conn.rollback();
      throw err;
    } finally {
      conn.release();
    }
  }

  static async getById(id) {
    const [rows] = await pool.query("SELECT * FROM patients WHERE id = ?", [
      id,
    ]);
    return rows[0] || null;
  }

  static async update(id, { patient_name, age, patient_condition }) {
    const conn = await pool.getConnection();
    try {
      await conn.beginTransaction();
      await conn.query(
        "UPDATE patients SET patient_name = ?, age = ?, patient_condition = ? WHERE id = ?",
        [patient_name, age, patient_condition, id]
      );
      await conn.commit();
      return { id, patient_name, age, patient_condition };
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
      await conn.query("DELETE FROM patients WHERE id = ?", [id]);
      await conn.commit();
      return { id };
    } catch (err) {
      await conn.rollback();
      throw err;
    } finally {
      conn.release();
    }
  }

  static async getByName(patient_name) {
    const [rows] = await pool.query(
      "SELECT * FROM patients WHERE patient_name = ?",
      [patient_name]
    );
    return rows;
  }
}
