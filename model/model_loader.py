import torch
import pandas as pd
from PIL import Image
from sklearn.metrics.pairwise import cosine_similarity
from transformers import CLIPProcessor, CLIPModel

# Load model and captions once
processor = CLIPProcessor.from_pretrained("openai/clip-vit-base-patch32")
clip_model = CLIPModel.from_pretrained("openai/clip-vit-base-patch32")
captions_df = pd.read_csv("model/social_media_captions_400.csv")
candidate_captions = captions_df['Caption'].tolist()

def load_and_preprocess_image(image_path):
    image = Image.open(image_path).convert("RGB")
    inputs = processor(images=image, return_tensors="pt")
    return inputs

def generate_image_embeddings(inputs):
    with torch.no_grad():
        image_features = clip_model.get_image_features(**inputs)
    return image_features

def match_captions(image_features):
    text_inputs = processor(text=candidate_captions, return_tensors="pt", padding=True)
    with torch.no_grad():
        text_features = clip_model.get_text_features(**text_inputs)

    image_features = image_features.detach().cpu().numpy()
    text_features = text_features.detach().cpu().numpy()

    similarities = cosine_similarity(image_features, text_features)
    best_indices = similarities.argsort(axis=1)[0][::-1]

    best_captions = [candidate_captions[i] for i in best_indices]
    best_similarities = similarities[0][best_indices].tolist()
    
    return best_captions[:5], best_similarities[:5]
