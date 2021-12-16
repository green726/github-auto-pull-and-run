let name = "me"

let testOb = {
    "java": {
        "start": {
            "test": `hello ${name}`
        }
    }
}
console.log(testOb.java.start.test)