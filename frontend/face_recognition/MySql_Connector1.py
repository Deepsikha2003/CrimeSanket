import mysql.connector

# Connect to your MySQL database
conn = mysql.connector.connect(
    host='localhost',
    user='root',
    password='deeps@2003',
    database='mydb'
)

cursor = conn.cursor()

# Read the uploaded image as binary
with open(r"C:\Users\Samsung\Downloads\PritamCriminal102.jpg", "rb") as file:
    binary_data = file.read()

# Correct SQL update query
sql = "UPDATE Criminal SET photo = %s WHERE Criminal_id = %s"
cursor.execute(sql, (binary_data, 102))  # Replace 102 with the correct Criminal_id

# Commit and close
conn.commit()
cursor.close()
conn.close()

print("✅ Image uploaded to MySQL successfully.")
