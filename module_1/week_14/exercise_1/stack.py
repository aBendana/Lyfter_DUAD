class Node:
    data: str

    def __init__(self, data, next=None):
        self.data = data
        self.next = next

class LinkedList:
    top: Node

    def __init__(self, head):
        self.top = head


    def print_structure(self):
        current_node = self.top
        while (current_node is not None):
            print(current_node.data)
            current_node = current_node.next



class Stack(LinkedList):
    
    def push(self, new_node):
        
        if new_node is not None:
            ## the commented prints was used to follow the sequence
            current_node = self.top
            #print(f"Flag {current_node.data}")
            self.top = new_node
            #print(f"Flag {self.top.data}")
            new_node.next = current_node
            #print(f"Flag {current_node.data}")


    def pop(self):

        if self.top is not None:
            self.top = self.top.next



third_node = Node("I'm the third node")
second_node = Node("I'm the second node", third_node)
first_node = Node("I'm the first node", second_node)

stack = Stack(first_node)
print("This is the original data structure:")
stack.print_structure()

print("")
print("Adding a element")
stack.push(Node("I'm the new node!"))
stack.print_structure()

print("")
print("Removing the element")
stack.pop()
stack.print_structure()