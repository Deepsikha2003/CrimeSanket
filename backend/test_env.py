import os
from dotenv import load_dotenv

# Explicit path to the .env file
env_path = os.path.join(os.path.dirname(__file__), '.env')
print(f"[DEBUG] .env path: {env_path}")

load_dotenv(dotenv_path=env_path)

print("EMAIL_USER =", os.getenv("EMAIL_USER"))
print("EMAIL_PASS =", os.getenv("EMAIL_PASS"))
print("EMAIL_TO =", os.getenv("EMAIL_TO"))
