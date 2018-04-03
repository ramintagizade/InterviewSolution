var graph = {};
var visited = {};
var allPaths = [];
var seen = [];
var visitedPath = {};
function processData(input) {
    
    let data = input.trim().split(",");
    graph = {};
    for(let i=0;i<data.length;i++) {
        let route = data[i].trim().split("");
        let s  = route[0];
        let t  = route[1];
        let w  = parseInt(route[2]);

        if(graph[s] == undefined ) graph[s] = [];

        graph[s].push([t,w]);

    }
    // test cases  
    processFirst5Tests();
    process6and7Tests();
    process8and9Tests();
    process10thTest();
}
function processFirst5Tests () {
    let cases = ["A-B-C","A-D","A-D-C","A-E-B-C-D","A-E-D"];
    for(let i=0;i<cases.length;i++) {
        let routes = cases[i].split("-");
        let src = routes.shift();
        console.log("Output #"+(i+1)+": "+ dfs(src,routes,0));
    }
}
function process6and7Tests() {
    allPaths = [];
    console.log("Output #6:"+ dfsPath3("C","C",">=", "",3));
    allPaths = [];
    console.log("Output #7:"+ dfsPath3("A","C","==", "",4));
}
function process8and9Tests() {
    visitedPath = {};
    allPaths = [];
    dfsPath("A","C","");
    console.log("Output #8:"+ findShortestPath(allPaths));

    visitedPath = {};
    allPaths = [];
    dfsPath("B","B","");
    console.log("Output #9:"+ findShortestPath(allPaths));
}
function process10thTest() {
    allPaths = [];
    console.log("Output #10:"+ dfsPath2("C","C","",30));
}
// to find 1 to 5th test cases 
function dfs(src, path, dist) {
    if(!path.length) return dist;
    let next = path.shift()[0];
    let found = false,curDist = 0;
    for(let i=0;graph[src] && i<graph[src].length;i++) {
        if(next==graph[src][i][0]) {
            found = true;
            curDist = graph[src][i][1];
            break;
        }
    }
    if(found){
        return dfs(next,path,dist+curDist);
    }
    else 
        return "NO SUCH ROUTE"; 
}

// to find 8 and 9th test cases
function findShortestPath(paths) {
    let ans = 100000000;
    for(let i=0;i<paths.length;i++) {
        let min_dist = 0;
        let prev = paths[i][0];
        paths[i] = paths[i].substr(1);
        while(paths[i].length>0) {
            let v = paths[i][0];
            paths[i] = paths[i].substr(1);
            for(let j=0;j<graph[prev].length;j++){
                if(v==graph[prev][j][0]){
                    min_dist=min_dist + graph[prev][j][1];
                    break;
                }
            }
            prev = v;
        }
        if(ans> min_dist ) ans = min_dist;
    }
    return ans;
}
// to find 8 and 9th test cases  
function dfsPath(start,end, path) {
    path = path.concat(start);
    visited[start] = 1;
    for(let i=0;graph[start] && i<graph[start].length;i++) {
        let curS = graph[start][i][0];
         if(curS==end) {
            allPaths.push(path+end);
            visitedPath[path+end] = 1;
        }
        if(!visited[curS] && !visitedPath[path])
            dfsPath(curS,end,path);
    } 
    visited[start] = 0;
}
// to find 10th test case 
function dfsPath2(start,end, path,dist) {
    if(dist<0) return;
    path = path.concat(start);

    for(let i=0;graph[start] && i<graph[start].length;i++) {
        let curS = graph[start][i][0];
        let w = graph[start][i][1];
         if(curS==end && dist - w > 0) {
            allPaths.push(path+end);
        }
        dfsPath2(curS,end,path,dist-w);
    }
    return allPaths.length; 
}
// to find 6 and  7th test cases 
function dfsPath3(start,end, cmp, path,stops) {
    if(stops<0) return;
    path = path.concat(start);

    for(let i=0;graph[start] && i<graph[start].length;i++) {
        let curS = graph[start][i][0];
        let w = graph[start][i][1];
        if(curS==end && cmp =="==" && stops-1==0) {
            allPaths.push(path+end);
        }
        if(curS==end && cmp == ">=" && stops-1>=0) {
            allPaths.push(path+end);
        }
        dfsPath3(curS,end,cmp, path,stops-1);
    }
    return allPaths.length; 
}


process.stdin.resume();

process.stdin.setEncoding("ascii");
_input = "";

process.stdin.on("data", function (input) {
    _input += input;
});

process.stdin.on("end", function () {
   processData(_input);
});