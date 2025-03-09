class Node:
    data: str

    def __init__(self, data, next=None):
        self.data = data
        self.next = next

class LinkedList:
    head: Node

    def __init__(self, head):
        self.head = head


    def print_structure(self):
        current_node = self.head
        while (current_node is not None):
            print(current_node.data)
            current_node = current_node.next


class DoubleEndedQueue(LinkedList):

    def push_left(self, new_node):
        current_node = self.head
        self.head = new_node
        new_node.next = current_node
    

    def push_right(self, new_node):
        current_node = self.head
        next_node = current_node.next
        while (next_node is not None):
            current_node = next_node
            next_node = current_node.next

        current_node.next = new_node


    def pop_left(self):
        
        if self.head is not None:
            self.head = self.head.next
        else:
            print("Empty structure")


    def pop_right(self):

        if self.head is not None:    
            
            current_node = self.head
            next_node = current_node.next

            if next_node is None:
                self.head = None

            else:
                while (next_node.next is not None):
                    current_node = next_node
                    next_node = current_node.next
                current_node.next = None

        else:
            print("Empty structure")
 


fourth_node = Node("I'm the fourth node")
third_node = Node("I'm the third node", fourth_node)
second_node = Node("I'm the second node", third_node)
first_node = Node("I'm the first node", second_node)

double_ended_queue = DoubleEndedQueue(first_node)
print("This is the original data structure:")
double_ended_queue.print_structure()

print("")
print("Adding a element in the left side")
double_ended_queue.push_left(Node("I'm the new head node!"))
double_ended_queue.print_structure()

print("")
print("Adding a element in the right side")
double_ended_queue.push_right(Node("I'm the new tail node!"))
double_ended_queue.print_structure()

print("")
print("Removing the head element in the left side")
double_ended_queue.pop_left()
double_ended_queue.print_structure()

print("")
print("Removing the tail element in the right side")
double_ended_queue.pop_right()
double_ended_queue.print_structure()
