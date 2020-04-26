function intersect_point(point1, point2, point3, point4) {
   const ua = ((point4[0] - point3[0]) * (point1[1] - point3[1]) -
              (point4[1] - point3[1]) * (point1[0] - point3[0])) /
              ((point4[1] - point3[1]) * (point2[0] - point1[0]) -
              (point4[0] - point3[0]) * (point2[1] - point1[1]));

  const ub = ((point2[0] - point1[0]) * (point1[1] - point3[1]) -
             (point2[1] - point1[1]) * (point1[0] - point3[0])) /
             ((point4[1] - point3[1]) * (point2[0] - point1[0]) -
             (point4[0] - point3[0]) * (point2[1] - point1[1]));

  const x = point1[0] + ua * (point2[0] - point1[0]);
  const y = point1[1] + ua * (point2[1] - point1[1]);

  return [x, y]
}

function get_min(a1, b1, a2, b2, z){
  let bw = w+2;
  x1 = 0
  x2 = width
  y1 = x1*a1 + b1;
  y2 = x2*a1 + b1;
  y3 = -x1*a2 + b2;
  y4 = -x2*a2 + b2;

  let min = intersect_point([x1,y1], [x2,y2], [x1,y3], [x2,y4])
  min = !z ? floor((-min[0] / bw) + (min[1] / (bw*0.75))) : floor((min[1] /(bw*0.75)) + (min[0] /bw));
  return min
}
