import tensorflow as tf
from tensorflow.keras.applications import VGG16
from tensorflow.keras.layers import Dense, Flatten, Dropout
from tensorflow.keras.models import Model, load_model
import numpy as np
import os

class BrainTumorModel:
    def __init__(self, model_path='brain_tumor_model.h5'):
        self.model_path = model_path
        self.model = self._load_or_build_model()
        self.classes = ['Glioma', 'Meningioma', 'No Tumor', 'Pituitary']

    def _load_or_build_model(self):
        if os.path.exists(self.model_path):
            print(f"Loading model from {self.model_path}")
            return load_model(self.model_path)
        else:
            print("Model file not found. Building a new VGG16-based model (untrained).")
            base_model = VGG16(weights='imagenet', include_top=False, input_shape=(224, 224, 3))
            for layer in base_model.layers:
                layer.trainable = False
            
            x = Flatten()(base_model.output)
            x = Dense(512, activation='relu')(x)
            x = Dropout(0.5)(x)
            output = Dense(4, activation='softmax')(x)
            
            model = Model(inputs=base_model.input, outputs=output)
            model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])
            return model

    def predict(self, processed_image):
        preds = self.model.predict(processed_image)
        class_idx = np.argmax(preds[0])
        confidence = float(preds[0][class_idx])
        return self.classes[class_idx], confidence, preds[0]

    def get_last_conv_layer(self):
        # specific to VGG16, usually block5_conv3
        try:
            return self.model.get_layer('block5_conv3')
        except:
            # Fallback if model structure is different
            for layer in reversed(self.model.layers):
                if len(layer.output_shape) == 4:
                    return layer
            return None
