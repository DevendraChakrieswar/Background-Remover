import requests

url = "http://127.0.0.1:5000/evaluate"
files = {
    "image": open("leo_messi.jpg", "rb"),
    "mask": open("ground_truth_mask.png", "rb")
}

response = requests.post(url, files=files)
print(response.json())
