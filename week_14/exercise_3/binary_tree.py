class Node:
    data: str

    def __init__(self, data):
        self.data = data
        self.left_node = None
        self.right_node = None


class BinaryTree:

    def __init__(self):
        self.root = None


    # comments that have prints, were used to know where the node was gone
    def add_node(self, node):
        
        if self.root is None:
            self.root = node
            #print(f"FlagRoot {self.root.data}")
        else:
            current_node = self.root
            self.add_left_right(current_node, node)


    def add_left_right(self, current_node, node):
        
        if node.data < current_node.data:
            if current_node.left_node is None:
                current_node.left_node = node
                #print(f"FlagLeft {current_node.left_node.data}")
            else:
                self.add_left_right(current_node.left_node, node)
        
        else:
            if current_node.right_node is None:
                current_node.right_node = node
                #print(f"FlagRight {current_node.right_node.data}")
            else:
                self.add_left_right(current_node.right_node, node)


    def print_tree(self, root):
        current_node = root

        if current_node is not None:
            print(current_node.data)
            self.print_tree(current_node.left_node)
            self.print_tree(current_node.right_node)


root_node = Node("M, I'm the main root")
node_left_one = Node("E, I'm the first left root ")
node_right_one = Node("T, I'm the first right root")
node_left_left = Node("A, I'm a left leaf in left root")
node_left_right = Node("F, I'm a right leaf in left root")
node_right_left = Node("P I'm a left leaf in right root")
node_right_right = Node("Z, I'm a right leaf in right root")

the_tree = BinaryTree()
the_tree.add_node(root_node)
the_tree.add_node(node_left_one)
the_tree.add_node(node_right_one)
the_tree.add_node(node_left_left)
the_tree.add_node(node_left_right)
the_tree.add_node(node_right_left)
the_tree.add_node(node_right_right)

print("")
the_tree.print_tree(the_tree.root)