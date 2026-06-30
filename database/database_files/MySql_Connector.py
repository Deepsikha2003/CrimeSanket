import mysql.connector

# Connect to MySQL
conn = mysql.connector.connect(
    host='localhost',
    user='root',
    password='deeps@2003',
    database='mydb'
)
cursor = conn.cursor()

# Read image as binary
with open(r"C:\Users\Samsung\Downloads\PritamCriminal102.jpg", "rb") as file:
    binary_data = file.read()

# Insert image into Criminal table (example for criminal_id = 101)
sql = "UPDATE Criminal SET photo = %s WHERE criminal_id = 101"
cursor.execute(sql, (binary_data,))

conn.commit()
cursor.close()
conn.close()
