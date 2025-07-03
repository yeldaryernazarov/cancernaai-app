import nibabel as nib
import numpy as np
import torch
from scipy.ndimage import zoom

def normalize_volume(volume):
    volume = np.clip(volume, -1000, 1000)
    volume = (volume + 1000) / 2000
    volume = (volume - np.mean(volume)) / (np.std(volume) + 1e-8)
    return volume

def resize_volume(volume, target_size=(128, 128, 64)):
    zoom_factors = [t / s for t, s in zip(target_size, volume.shape)]
    return zoom(volume, zoom_factors, order=1)

def preprocess(nifti_path, target_size=(128, 128, 64)):
    nii = nib.load(nifti_path)
    volume = nii.get_fdata()
    volume = normalize_volume(volume)
    resized = resize_volume(volume, target_size)
    tensor = torch.FloatTensor(resized).unsqueeze(0).unsqueeze(0)  # (1, 1, D, H, W)
    return tensor, resized
