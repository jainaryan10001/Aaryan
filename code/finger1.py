import cv2
import mediapipe as mp

# Camera start
cap = cv2.VideoCapture(0)

# Set higher resolution (bigger display)
cap.set(3, 700)  # Width
cap.set(4, 720)   # Height

# Mediapipe setup
mpHands = mp.solutions.hands
hands = mpHands.Hands()
mpDraw = mp.solutions.drawing_utils

# Finger counting function
def countFingers(handLms):
    fingers = []

    # Thumb
    if handLms.landmark[4].x < handLms.landmark[3].x:
        fingers.append(1)
    else:
        fingers.append(0)

    # Other fingers
    tipIds = [8, 12, 16, 20]

    for tip in tipIds:
        if handLms.landmark[tip].y < handLms.landmark[tip - 2].y:
            fingers.append(1)
        else:
            fingers.append(0)

    return fingers.count(1)


while True:

    success, img = cap.read()
    if not success:
        print("Camera issue")
        break

    img = cv2.flip(img, 1)

    h, w, c = img.shape

    imgRGB = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    results = hands.process(imgRGB)

    if results.multi_hand_landmarks:

        for handLms in results.multi_hand_landmarks:

            # Finger count
            totalFingers = countFingers(handLms)

            cv2.putText(img, f'Fingers: {totalFingers}', (50, 100),
                        cv2.FONT_HERSHEY_SIMPLEX, 2, (0, 255, 255), 4)

            # Draw hand landmarks
            mpDraw.draw_landmarks(img, handLms, mpHands.HAND_CONNECTIONS)

    # Show bigger window
    cv2.imshow("Finger Counter", img)

    if cv2.waitKey(1) & 0xFF == 27:
        break

cap.release()
cv2.destroyAllWindows()