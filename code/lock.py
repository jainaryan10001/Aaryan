import cv2
import mediapipe as mp
import os

# Initialize mediapipe
mp_hands = mp.solutions.hands
hands = mp_hands.Hands(max_num_hands=2)
mp_draw = mp.solutions.drawing_utils

cap = cv2.VideoCapture(0)
cap.set(3, 700)  # Width
cap.set(4, 720)   # Height

# Your secret folder path
SECRET_FOLDER = r"C:\Users\ARYAN JAIN\OneDrive\Desktop\ary"

def count_fingers(hand_landmarks):
    fingers = []

    # Tip IDs for fingers
    tips = [4, 8, 12, 16, 20]

    # Thumb
    if hand_landmarks.landmark[tips[0]].x < hand_landmarks.landmark[tips[0] - 1].x:
        fingers.append(1)
    else:
        fingers.append(0)

    # Other 4 fingers
    for i in range(1, 5):
        if hand_landmarks.landmark[tips[i]].y < hand_landmarks.landmark[tips[i] - 2].y:
            fingers.append(1)
        else:
            fingers.append(0)

    return sum(fingers)

while True:
    ret, frame = cap.read()
    if not ret:
        break

    frame = cv2.flip(frame, 1)
    rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

    results = hands.process(rgb)

    finger_count = 0

    if results.multi_hand_landmarks:
        for hand_landmarks in results.multi_hand_landmarks:
            mp_draw.draw_landmarks(frame, hand_landmarks, mp_hands.HAND_CONNECTIONS)

            finger_count = count_fingers(hand_landmarks)

    cv2.putText(frame, f"Fingers: {finger_count}", (20, 50),
                cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)

    # ✋ 5 fingers → Open folder
    if finger_count == 5:
        cv2.putText(frame, "OPENING SECRET FOLDER", (20, 100),
                    cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 0, 0), 2)

        os.startfile(SECRET_FOLDER)

    # ✌️ 2 fingers → Close folder
    elif finger_count == 2:
        cv2.putText(frame, "CLOSING SECRET FOLDER", (20, 100),
                    cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)

        os.system("taskkill /f /im explorer.exe")
        os.system("start explorer.exe")

    cv2.imshow("Gesture Lock System", frame)

    if cv2.waitKey(1) & 0xFF == 27:
        break

cap.release()
cv2.destroyAllWindows()