class Head:
    def __init__(self):
        pass


class Torso:
    def __init__(self, head, left_arm, right_arm, left_leg, right_leg):
        print("\ncreating the torso...")
        self.head = head
        print("connecting the head")
        self.left_arm = left_arm
        print("connecting the left arm")
        self.right_arm = right_arm
        print("connecting the right arm")
        self.left_leg = left_leg
        print("connecting the left leg")
        self.right_leg = right_leg
        print("connecting the right leg")


class Arm:
    def __init__(self, hand):
        print("\ncreating an arm...")
        self.hand = hand
        print("connecting a hand")


class Hand:
    def __init__(self):
        pass


class Leg:
    def __init__(self, foot):
        print("\ncreating a leg...")
        self.foot = foot
        print("connecting a foot")


class Foot:
    def __init__(self):
        pass


class Human:
    def __init__(self, torso):
        self.torso = torso
        print("\nI am fully assembled human!")


left_foot = Foot()
left_leg = Leg(left_foot)

right_foot = Foot()
right_leg = Leg(right_foot)

left_hand = Hand()
left_arm = Arm(left_hand)

right_hand = Hand()
right_arm = Arm(right_hand)

head = Head()

torso = Torso(head, left_arm, right_arm, left_leg, right_leg)

human = Human(torso)

