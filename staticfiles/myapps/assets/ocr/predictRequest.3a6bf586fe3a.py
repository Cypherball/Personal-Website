#import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import json
import os
from skimage.transform import resize
import tensorflow as tf

IMG_SIZE = 28

def process(data):
    imgData = json.loads(data)
    width = imgData['width']
    height = imgData['height']
    #full_filename=os.path.join('myapps', 'static', 'myapps', 'assets', 'ocr', "image.txt")
    image = np.asarray(imgData['image'],dtype=float)
    #np.savetxt(full_filename, image)
    #image = np.loadtxt(full_filename)
    image = image.reshape(width, height)
    image_resized = resize(image, (IMG_SIZE, IMG_SIZE), anti_aliasing=False)
    image_resized = tf.keras.utils.normalize(image_resized, axis=1)
    #plt.imshow(image_resized)
    #plt.show()
    prediction = predict(image_resized)
    return str(prediction)

def predict(image):
    try:
        model_filename=os.path.join('myapps', 'static', 'myapps', 'assets', 'ocr', "ocr.h5")
        ocr_model = tf.keras.models.load_model(model_filename)
        image = image.reshape(1,IMG_SIZE,IMG_SIZE,1)
        predictions = ocr_model.predict(image)
        return np.argmax(predictions[0])
    except:
        return "Server Error :("