from flask import Flask, jsonify, render_template, request, redirect
import mysql.connector
import base64
import logging

# Initialize Flask app
app = Flask(__name__, template_folder="views")

# Enable logging
logging.basicConfig(level=logging.INFO)

# 🔒 Database connector
def get_db_connection():
    return mysql.connector.connect(
        host='localhost',
        user='root',
        password="YOUR_PASSWORD"
        database='mydb'
    )

# 🧪 Check DB connectivity
@app.route("/db-check")
def db_check():
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT DATABASE();")
        db_name = cursor.fetchone()[0]
        cursor.close()
        conn.close()
        return f"✅ Connected to database: {db_name}"
    except Exception as e:
        logging.error("Connection failed: %s", str(e))
        return f"❌ Connection failed: {str(e)}"

# 🔐 Login page
@app.route("/login", methods=["GET"])
def login_page():
    return render_template("login.html")

# 🔐 Handle login request
@app.route("/login", methods=["POST"])
def login():
    officer_id = request.form.get("officer_id")
    name = request.form.get("name")
    password = request.form.get("password")
    position = request.form.get("position")

    conn = get_db_connection()
    cursor = conn.cursor()
    query = """
        SELECT * FROM Officer
        WHERE officer_id = %s AND name = %s AND password = %s AND position = %s
    """
    cursor.execute(query, (officer_id, name, password, position))
    result = cursor.fetchone()
    cursor.close()
    conn.close()

    if result:
        logging.info("✅ Login success for officer: %s", name)
        return render_template("home.html", officer_name=name)
    else:
        logging.warning("❌ Login failed for ID: %s", officer_id)
        return render_template("login.html", error="❌ Invalid credentials. Please try again.")

# 📝 Signup page
@app.route("/signup", methods=["GET"])
def signup_page():
    return render_template("signup.html")

# 📝 Handle signup submission
@app.route("/signup", methods=["POST"])
def signup():
    officer_id = request.form.get("officer_id")
    name = request.form.get("name")
    password = request.form.get("password")
    position = request.form.get("position")

    conn = get_db_connection()
    cursor = conn.cursor()
    insert_query = """
        INSERT INTO Officer (officer_id, name, password, position)
        VALUES (%s, %s, %s, %s)
    """

    try:
        cursor.execute(insert_query, (officer_id, name, password, position))
        conn.commit()
        cursor.close()
        conn.close()
        logging.info("✅ New officer registered: %s", name)
        return redirect("/login?signup=success")
    except mysql.connector.Error as err:
        logging.error("❌ Signup error: %s", str(err))
        cursor.close()
        conn.close()
        return render_template("signup.html", error="❌ Failed to register. Try again.")

# 🕵️ Get all criminals with photo
@app.route("/criminals")
def criminals():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT Criminal_id, name, photo FROM Criminal")
    data = []
@app.route("/search", methods=["POST"])
def search():
    criminal_id = request.form.get("criminal_id") or ""
    name = request.form.get("name") or ""
    city = request.form.get("city") or "Any"

    # Use these safely in your query

    for criminal_id, name, photo in cursor.fetchall():
        encoded_photo = base64.b64encode(photo).decode('utf-8') if photo else None
        data.append({
            "id": criminal_id,
            "name": name,
            "photo": encoded_photo
        })

    cursor.close()
    conn.close()
    return jsonify(data)

# 🧩 Future feature: add new criminal via form
# @app.route("/add-criminal", methods=["POST"])
# def add_criminal():
#     # Form logic here: criminal_id, name, photo
#     pass

# 🔄 Run Flask app
if __name__ == "__main__":
    app.run(debug=True)