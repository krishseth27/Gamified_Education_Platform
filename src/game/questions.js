export const SAMPLE_QUESTIONS = {
arrays: [
{ q: "What is the index of the FIRST element in a JavaScript array?", options: ["0","1","-1","None"], ans: 0, explanation: "Arrays in JS are zero-indexed, so the first element is at index 0." },
{ q: "Which method adds an element to the END of an array?", options: ["push()","pop()","shift()","unshift()"], ans: 0, explanation: "push() appends elements to the end of an array and returns the new length." },
{ q: "What does arr.length return for arr = [1,2,3]?", options: ["3","2","4","0"], ans: 0, explanation: "length property returns the count of elements. [1,2,3] has 3 elements." },
],
loops: [
{ q: "Which loop is guaranteed to execute AT LEAST once?", options: ["do...while","for","while","forEach"], ans: 0, explanation: "do...while checks the condition AFTER running the body." },
{ q: "What does 'break' do inside a loop?", options: ["Exits the loop","Skips one iteration","Restarts the loop","Throws an error"], ans: 0, explanation: "break immediately exits the current loop." },
{ q: "for (let i=0; i<3; i++) — how many times?", options: ["3","2","4","0"], ans: 0, explanation: "i goes 0,1,2 — that's 3 iterations." },
],
functions: [
{ q: "What keyword defines a function?", options: ["function","def","fun","func"], ans: 0, explanation: "JavaScript uses the 'function' keyword." },
{ q: "What does a function return if no return?", options: ["undefined","null","0","false"], ans: 0, explanation: "Functions without return implicitly return undefined." },
],
};
