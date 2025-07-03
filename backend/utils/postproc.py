import os
import numpy as np
import cv2
from scipy.ndimage import center_of_mass

def save_prediction(output_tensor, volume_tensor=None, path="/Users/yeldar/Documents/Web apps/cancernaai_app/backend/static/result.png", threshold=0.5):
    os.makedirs(os.path.dirname(path), exist_ok=True)

    # Process segmentation output
    output = output_tensor.squeeze().detach().cpu().numpy()  # (D, H, W)
    mask = (output > threshold).astype(np.uint8)

    # Central slice selection (depth-wise)
    center_idx = mask.shape[0] // 2
    mask_slice = mask[center_idx]
    
    # Optional: base image from volume for overlay
    if volume_tensor is not None:
        volume = volume_tensor if isinstance(volume_tensor, np.ndarray) else volume_tensor.squeeze().detach().cpu().numpy()
        volume_slice = volume[center_idx]
        volume_slice = cv2.normalize(volume_slice, None, 0, 255, cv2.NORM_MINMAX).astype(np.uint8)
        image = cv2.cvtColor(volume_slice, cv2.COLOR_GRAY2BGR)  # Convert to 3-channel
    else:
        # If no base volume provided, create a plain grayscale mask visualization
        image = np.stack([mask_slice * 255]*3, axis=-1).astype(np.uint8)

    # Overlay the mask on the image
    color_mask = np.zeros_like(image)
    color_mask[mask_slice == 1] = [0, 0, 255]  # Red color for tumor
    blended = cv2.addWeighted(image, 0.8, color_mask, 0.5, 0)

    # Compute centroid and draw
    if np.sum(mask_slice) > 0:
        cy, cx = center_of_mass(mask_slice)
        cv2.circle(blended, (int(cx), int(cy)), 5, (0, 255, 0), -1)  # Green dot at center

    # Save output
    success = cv2.imwrite(path, blended)
    if not success:
        raise IOError(f"Failed to save image to {path}")

    return path
