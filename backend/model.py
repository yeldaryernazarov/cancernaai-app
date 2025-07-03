import torch
import torch.nn as nn
# 🔧 ENHANCED FUZZY LOGIC UTILITIES FOR MEDICAL UNCERTAINTY
class MedicalFuzzyLogic:
    """Advanced fuzzy logic for uncertainty handling in medical imaging"""

    @staticmethod
    def fuzzy_membership(x, low, mid, high):
        """Triangular membership function"""
        if x <= low or x >= high:
            return 0.0
        elif x <= mid:
            return (x - low) / (mid - low)
        else:
            return (high - x) / (high - mid)

    @staticmethod
    def confidence_score(prediction, threshold=0.5):
        """Calculate fuzzy confidence score"""
        prob = torch.sigmoid(prediction)
        # Distance from decision boundary
        distance = torch.abs(prob - threshold)
        # Convert to confidence (0=uncertain, 1=confident)
        confidence = 2 * distance  # Scale to 0-1
        return torch.clamp(confidence, 0, 1)

    @staticmethod
    def risk_stratification(features):
        """Fuzzy risk stratification for lung nodules"""
        # Features: [size, density, shape_irregularity, location, patient_age]
        size_risk = MedicalFuzzyLogic.fuzzy_membership(features[0], 5, 15, 30)  # mm
        density_risk = MedicalFuzzyLogic.fuzzy_membership(features[1], -200, 0, 200)  # HU
        shape_risk = MedicalFuzzyLogic.fuzzy_membership(features[2], 0, 0.5, 1)  # irregularity

        # Weighted combination
        total_risk = 0.4 * size_risk + 0.3 * density_risk + 0.3 * shape_risk
        return total_risk

    @staticmethod
    def fuzzy_intersection(mask1, mask2):
        """Fuzzy intersection of two masks"""
        return torch.min(mask1, mask2)

    @staticmethod
    def fuzzy_union(mask1, mask2):
        """Fuzzy union of two masks"""
        return torch.max(mask1, mask2)

    @staticmethod
    def malignancy_likelihood(prediction_score, confidence_score, clinical_features=None):
        """Enhanced malignancy assessment with fuzzy logic"""
        base_likelihood = torch.sigmoid(prediction_score)

        # Adjust based on confidence
        adjusted_likelihood = base_likelihood * confidence_score

        # Clinical feature adjustment (if available)
        if clinical_features is not None:
            age_factor = MedicalFuzzyLogic.fuzzy_membership(clinical_features.get('age', 50), 40, 60, 80)
            smoking_factor = clinical_features.get('smoking_history', 0.5)

            clinical_adjustment = 0.1 * age_factor + 0.1 * smoking_factor
            adjusted_likelihood = adjusted_likelihood + clinical_adjustment

        return torch.clamp(adjusted_likelihood, 0, 1)
# 🧠 ENHANCED DUAL-STAGE MODEL WITH EXPLAINABILITY
class ClassificationNet(nn.Module):
    """Enhanced classification network with attention mechanisms"""
    def __init__(self, in_channels=1):
        super(ClassificationNet, self).__init__()

        self.features = nn.Sequential(
            # Block 1
            nn.Conv3d(in_channels, 32, 3, padding=1),
            nn.BatchNorm3d(32),
            nn.ReLU(inplace=True),
            nn.MaxPool3d(2),

            # Block 2
            nn.Conv3d(32, 64, 3, padding=1),
            nn.BatchNorm3d(64),
            nn.ReLU(inplace=True),
            nn.MaxPool3d(2),

            # Block 3
            nn.Conv3d(64, 128, 3, padding=1),
            nn.BatchNorm3d(128),
            nn.ReLU(inplace=True),
            nn.MaxPool3d(2),

            # Block 4 with attention
            nn.Conv3d(128, 256, 3, padding=1),
            nn.BatchNorm3d(256),
            nn.ReLU(inplace=True),
            nn.AdaptiveAvgPool3d(1)  # Global average pooling
        )

        self.classifier = nn.Sequential(
            nn.Dropout(0.5),
            nn.Linear(256, 128),
            nn.ReLU(inplace=True),
            nn.Dropout(0.3),
            nn.Linear(128, 64),
            nn.ReLU(inplace=True),
            nn.Linear(64, 2)  # Binary classification
        )

        # Risk assessment head
        self.risk_head = nn.Sequential(
            nn.Linear(256, 64),
            nn.ReLU(inplace=True),
            nn.Linear(64, 1)  # Continuous risk score
        )

    def forward(self, x):
        features = self.features(x)
        features_flat = features.view(features.size(0), -1)

        classification = self.classifier(features_flat)
        risk_score = self.risk_head(features_flat)

        return classification, risk_score

class SegmentationNet(nn.Module):
    """Enhanced 3D U-Net for segmentation with skip connections"""
    def __init__(self, in_channels=1, out_channels=1):
        super(SegmentationNet, self).__init__()

        # Encoder
        self.enc1 = self.conv_block(in_channels, 32)
        self.enc2 = self.conv_block(32, 64)
        self.enc3 = self.conv_block(64, 128)
        self.enc4 = self.conv_block(128, 256)

        # Bottleneck
        self.bottleneck = self.conv_block(256, 512)

        # Decoder
        self.upconv4 = nn.ConvTranspose3d(512, 256, 2, stride=2)
        self.dec4 = self.conv_block(512, 256)

        self.upconv3 = nn.ConvTranspose3d(256, 128, 2, stride=2)
        self.dec3 = self.conv_block(256, 128)

        self.upconv2 = nn.ConvTranspose3d(128, 64, 2, stride=2)
        self.dec2 = self.conv_block(128, 64)

        self.upconv1 = nn.ConvTranspose3d(64, 32, 2, stride=2)
        self.dec1 = self.conv_block(64, 32)

        # Final layer
        self.final = nn.Conv3d(32, out_channels, 1)

        # Pooling
        self.pool = nn.MaxPool3d(2)

    def conv_block(self, in_channels, out_channels):
        """Double convolution block with residual connection"""
        return nn.Sequential(
            nn.Conv3d(in_channels, out_channels, 3, padding=1),
            nn.BatchNorm3d(out_channels),
            nn.ReLU(inplace=True),
            nn.Conv3d(out_channels, out_channels, 3, padding=1),
            nn.BatchNorm3d(out_channels),
            nn.ReLU(inplace=True)
        )

    def forward(self, x):
        # Encoder
        e1 = self.enc1(x)
        e2 = self.enc2(self.pool(e1))
        e3 = self.enc3(self.pool(e2))
        e4 = self.enc4(self.pool(e3))

        # Bottleneck
        b = self.bottleneck(self.pool(e4))

        # Decoder with skip connections
        d4 = self.upconv4(b)
        d4 = torch.cat([d4, e4], dim=1)
        d4 = self.dec4(d4)

        d3 = self.upconv3(d4)
        d3 = torch.cat([d3, e3], dim=1)
        d3 = self.dec3(d3)

        d2 = self.upconv2(d3)
        d2 = torch.cat([d2, e2], dim=1)
        d2 = self.dec2(d2)

        d1 = self.upconv1(d2)
        d1 = torch.cat([d1, e1], dim=1)
        d1 = self.dec1(d1)

        output = self.final(d1)
        return torch.sigmoid(output)

class DualStageModel(nn.Module):
    """Enhanced combined classification and segmentation model"""
    def __init__(self):
        super(DualStageModel, self).__init__()
        self.classifier = ClassificationNet()
        self.segmenter = SegmentationNet()
        self.fuzzy = MedicalFuzzyLogic()

    def forward(self, x, stage='both'):
        if stage == 'classification' or stage == 'both':
            cls_output, risk_score = self.classifier(x)

        if stage == 'segmentation' or stage == 'both':
            seg_output = self.segmenter(x)

        if stage == 'both':
            return cls_output, risk_score, seg_output
        elif stage == 'classification':
            return cls_output, risk_score
        else:
            return seg_output