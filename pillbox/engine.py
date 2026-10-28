"""Demonstration decision logic for a simulated pill dispenser. NOT a medical device."""
from dataclasses import dataclass
from datetime import datetime, timezone
import math

@dataclass(frozen=True)
class Reading:
    expected_tag: str
    observed_tag: str
    acceleration_g: float
    scheduled: bool


def evaluate(r: Reading) -> dict:
    """Use explicit policy rules: RFID mismatch OR detected movement without schedule -> alert.
    An accelerometer can suggest movement, but cannot establish ingestion.
    """
    if not math.isfinite(r.acceleration_g) or r.acceleration_g < 0:
        raise ValueError('Acceleration must be a finite nonnegative value.')
    motion = r.acceleration_g >= 0.25  # DEMO threshold, not calibrated hardware
    mismatch = bool(r.observed_tag.strip()) and r.expected_tag.strip() != r.observed_tag.strip()
    wrong_time = motion and not r.scheduled
    missing_id = motion and not r.observed_tag.strip()
    reasons = []
    if mismatch: reasons.append('RFID tag does not match expected medication')
    if wrong_time: reasons.append('Movement outside scheduled dose window')
    if missing_id: reasons.append('Movement occurred without an RFID identification')
    return {
        'timestamp_utc': datetime.now(timezone.utc).isoformat(timespec='seconds'),
        'motion_detected': motion,
        'potential_error': bool(reasons),
        'message': '; '.join(reasons) if reasons else 'No potential error flagged in this demo',
        'note': 'Sensor signals do not verify swallowing or actual medication consumption.'
    }
