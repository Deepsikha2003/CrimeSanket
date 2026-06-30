# img = Image.open("ExtractedCriminal101.jpg")
# # img.show()

# from PIL import Image

# img = Image.open("ExtractedCriminal102.jpg")
# img.show()


import mysql.connector
from PIL import Image
import io

# ✅ Connect to your MySQL database
conn = mysql.connector.connect(
    host='localhost',
    user='root',
    password='deeps@2003',
    database='mydb'
)

cursor = conn.cursor()

# ✅ Fetch the image data for Criminal_id 103
sql = "SELECT photo FROM Criminal WHERE Criminal_id = %s"
cursor.execute(sql, (103,))
result = cursor.fetchone()

if result and result[0]:
    image_data = result[0]
    
    # ✅ Convert binary data to image
    image = Image.open(io.BytesIO(image_data))

    # ✅ Optionally show the image
    image.show()

    # ✅ Optionally save it to a file
    image.save("ExtractedCriminal103.jpg")

    print("✅ Image retrieved and saved as ExtractedCriminal103.jpg")
else:
    print("❌ No image found for Criminal_id 103")

# ✅ Clean up
cursor.close()
conn.close()



# import mysql.connector

# # Connect to your MySQL database
# conn = mysql.connector.connect(
#     host='localhost',
#     user='root',
#     password='deeps@2003',
#     database='mydb'
# )

# cursor = conn.cursor()

# # Read the image as binary
# with open(r"C:\Users\Samsung\Downloads\Anshika103Criminal.jpg", "rb") as file:
#     binary_data = file.read()

# # Update the photo field in the Criminal table
# sql = "UPDATE Criminal SET photo = %s WHERE Criminal_id = %s"
# cursor.execute(sql, (binary_data, 103))

# # Commit and close connection
# conn.commit()
# cursor.close()
# conn.close()

# print("✅ Anshika's photo updated as BLOB successfully.")
