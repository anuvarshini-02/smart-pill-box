"""Illustrative classifier trained on synthetic, rule-labeled data.
It does NOT demonstrate clinical prediction or a validated pill-consumption model.
"""
import random
from pathlib import Path
import joblib
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report

MODEL_PATH = Path(__file__).resolve().parent.parent / 'models' / 'demo_model.joblib'

def generate(n=1500,seed=42):
    rng = random.Random(seed)
    X=[];y=[]
    for _ in range(n):
        tag_matches = rng.randint(0,1)
        tag_present = rng.randint(0,1)
        motion_g = round(rng.random(), 4)
        in_schedule = rng.randint(0,1)
        motion = motion_g >= 0.25
        alert = (tag_present and not tag_matches) or (motion and not in_schedule) or (motion and not tag_present)
        X.append([tag_matches,tag_present,motion_g,in_schedule]);y.append(int(alert))
    return X,y

def train():
    X,y=generate()
    X_train,X_test,y_train,y_test=train_test_split(X,y,test_size=.25,random_state=42,stratify=y)
    model=RandomForestClassifier(n_estimators=100,max_depth=8,random_state=42)
    model.fit(X_train,y_train)
    print('Synthetic holdout evaluation only (NOT real-world accuracy):')
    print(classification_report(y_test,model.predict(X_test),zero_division=0))
    MODEL_PATH.parent.mkdir(parents=True,exist_ok=True)
    joblib.dump(model,MODEL_PATH)
    print('Saved:',MODEL_PATH)

if __name__=='__main__':train()
