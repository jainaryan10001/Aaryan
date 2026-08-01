import cv2
import mediapipe as mp
import pygame
import time

# -------- SOUND SETUP --------
pygame.mixer.pre_init(44100, -16, 2, 512)
pygame.mixer.init()

sounds = {
    "C": pygame.mixer.Sound("C.wav"),
    "D": pygame.mixer.Sound("D.wav"),
    "E": pygame.mixer.Sound("E.wav"),
    "F": pygame.mixer.Sound("F.wav"),
    "G": pygame.mixer.Sound("G.wav"),
    "A": pygame.mixer.Sound("A.wav"),
    "B": pygame.mixer.Sound("B.wav"),
   #"D#": pygame.mixer.Sound("Ds.wav"),
     #"F#": pygame.mixer.Sound("Fs.wav"),
     #"G#": pygame.mixer.Sound("Gs.wav"),
     #"A#": pygame.mixer.Sound("As.wav"),
}

white_notes = ["C", "D", "E", "F", "G", "A", "B"]
black_notes = ["C#", "D#", "", "F#", "G#", "A#", ""]

# -------- MEDIAPIPE --------
mp_hands = mp.solutions.hands
mp_draw = mp.solutions.drawing_utils

hands = mp_hands.Hands(max_num_hands=2)

# -------- CAMERA --------
cap = cv2.VideoCapture(0)

prev_positions = {}
last_time = {}
tap_threshold = 15
cooldown = 0.2

while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        break

    frame = cv2.flip(frame, 1)
    h, w, _ = frame.shape
    rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

    result = hands.process(rgb)

    key_width = w // len(white_notes)
    key_height = 120

    # -------- DRAW WHITE KEYS --------
    for i, note in enumerate(white_notes):
        x1 = i * key_width
        x2 = (i + 1) * key_width

        cv2.rectangle(frame, (x1, h-key_height), (x2, h), (255,255,255), -1)
        cv2.rectangle(frame, (x1, h-key_height), (x2, h), (0,0,0), 2)

        cv2.putText(frame, note, (x1+20, h-20),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0,0,0), 2)

    # -------- DRAW BLACK KEYS --------
    for i, note in enumerate(black_notes):
        if note != "":
            x = int((i + 0.75) * key_width)
            cv2.rectangle(frame, (x, h-key_height), (x+30, h-key_height+70), (0,0,0), -1)

    # -------- HAND TRACKING --------
    if result.multi_hand_landmarks:
        for hand_id, hand_landmarks in enumerate(result.multi_hand_landmarks):

            mp_draw.draw_landmarks(frame, hand_landmarks, mp_hands.HAND_CONNECTIONS)

            # 👉 MULTIPLE FINGERS
            finger_tips = [8, 12]  # index + middle

            for tip_id in finger_tips:
                lm = hand_landmarks.landmark[tip_id]

                x = int(lm.x * w)
                y = int(lm.y * h)

                cv2.circle(frame, (x, y), 8, (0,255,0), -1)

                key = f"{hand_id}_{tip_id}"

                if key not in prev_positions:
                    prev_positions[key] = y
                    last_time[key] = 0

                dy = prev_positions[key] - y

                if dy < -tap_threshold:
                    now = time.time()

                    if now - last_time[key] > cooldown:

                        # -------- CHECK WHITE KEYS --------
                        key_index = x // key_width
                        if key_index < len(white_notes):
                            note = white_notes[key_index]
                            sounds[note].play()

                            cv2.putText(frame, note, (x, y-20),
                                        cv2.FONT_HERSHEY_SIMPLEX, 1, (0,0,255), 2)

                        last_time[key] = now

                prev_positions[key] = y

    cv2.imshow("Air Piano Pro", frame)

    if cv2.waitKey(1) & 0xFF == 27:
        break

cap.release()
cv2.destroyAllWindows()