let id = 0

function getId() {
  return ++id
}

const initializeUsers = () => [
  {
    "id": getId(),
    "name": "Ada Lovelace",
    "bio": "Ada Lovelace was an English mathematician and writer, chiefly known for her work on Charles Babbage's early mechanical general-purpose computer, the Analytical Engine. She is often regarded as the first computer programmer."
  },
  {
    "id": getId(),
    "name": "Linus Torvalds",
    "bio": "Linus Torvalds is a Finnish-American software engineer and creator of the Linux kernel, which became the foundation for numerous operating systems. His contributions to open-source software have had a significant impact on the technology industry."
  },
  {
    "id": getId(),
    "name": "Grace Hopper",
    "bio": "Grace Hopper was an American computer scientist and United States Navy rear admiral. She developed the first compiler for a computer programming language and played a vital role in the development of COBOL, one of the first high-level programming languages."
  },
  {
    "id": getId(),
    "name": "Guido van Rossum",
    "bio": "Guido van Rossum is a Dutch programmer and the creator of the Python programming language. His work on Python has made it one of the most popular and widely used programming languages in the world."
  },
  {
    "id": getId(),
    "name": "Margaret Hamilton",
    "bio": "Margaret Hamilton is an American computer scientist and systems engineer. She led the team that developed the on-board flight software for NASA's Apollo space program, making her contributions crucial to the success of the moon landing."
  }
]

// FAKE IN-MEMORY USERS "TABLE"
let users = initializeUsers()

const find = () => {
  // SELECT * FROM users;
  return Promise.resolve(users)
}

const findById = id => {
  // SELECT * FROM users WHERE id = 1;
  const user = users.find(d => d.id == id)
  return Promise.resolve(user)
}

const insert = ({ name, bio }) => {
  // INSERT INTO users (name, bio) VALUES ('foo', 'bar');
  const newUser = { id: getId(), name, bio }
  users.push(newUser)
  return Promise.resolve(newUser)
}

const update = (id, changes) => {
  // UPDATE users SET name = 'foo', bio = 'bar WHERE id = 1;
  const user = users.find(user => user.id == id)
  if (!user) return Promise.resolve(null)

  const updatedUser = { ...changes, id }
  users = users.map(d => (d.id == id) ? updatedUser : d)
  return Promise.resolve(updatedUser)
}

const remove = id => {
  // DELETE FROM users WHERE id = 1;
  const user = users.find(user => user.id == id)
  if (!user) return Promise.resolve(null)

  users = users.filter(d => d.id !== id)
  return Promise.resolve(user)
}

const reset = () => {
  users = initializeUsers()
}

module.exports = {
  find,
  findById,
  insert,
  update,
  remove,
  reset,
}
