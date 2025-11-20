import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from model import BrainTumorModel
import os

def train_model(data_dir, epochs=10, batch_size=32):
    if not os.path.exists(data_dir):
        print(f"Data directory {data_dir} not found.")
        return

    train_datagen = ImageDataGenerator(
        rescale=1./255,
        rotation_range=20,
        width_shift_range=0.2,
        height_shift_range=0.2,
        horizontal_flip=True,
        validation_split=0.2
    )

    train_generator = train_datagen.flow_from_directory(
        data_dir,
        target_size=(224, 224),
        batch_size=batch_size,
        class_mode='categorical',
        subset='training'
    )

    validation_generator = train_datagen.flow_from_directory(
        data_dir,
        target_size=(224, 224),
        batch_size=batch_size,
        class_mode='categorical',
        subset='validation'
    )

    tumor_model = BrainTumorModel()
    model = tumor_model.model

    # Unfreeze some layers for fine-tuning if needed, or just train the top layers
    # For now, we are training the top layers as defined in BrainTumorModel

    print("Starting training...")
    history = model.fit(
        train_generator,
        steps_per_epoch=train_generator.samples // batch_size,
        validation_data=validation_generator,
        validation_steps=validation_generator.samples // batch_size,
        epochs=epochs
    )

    model.save('brain_tumor_model.h5')
    print("Model saved to brain_tumor_model.h5")

if __name__ == "__main__":
    # Expects a directory structure:
    # dataset/
    #   Glioma/
    #   Meningioma/
    #   No Tumor/
    #   Pituitary/
    dataset_path = 'dataset' 
    train_model(dataset_path)
