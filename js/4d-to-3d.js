function points4DToPoints3D(points,rotationXY,rotationYZ,rotationXZ,rotationXW,rotationYW,rotationZW) {
  
    var cosA = Math.cos(rotationXY);
    var sinA = Math.sin(rotationXY);
  
    var cosB = Math.cos(rotationYZ);
    var sinB = Math.sin(rotationYZ);
  
    var cosC = Math.cos(rotationXZ);
    var sinC = Math.sin(rotationXZ);

    var cosD = Math.cos(rotationXW);
    var sinD = Math.sin(rotationXW);
  
    var cosE = Math.cos(rotationYW);
    var sinE = Math.sin(rotationYW);
  
    var cosF = Math.cos(rotationZW);
    var sinF = Math.sin(rotationZW);
    

    //i know how this looks but these are pre-multiplified all of 6 rotation matrixes for 4d point
    //source:  http://kennycason.com/posts/2009-01-08-graph4d-rotation4d-project-to-2d.html?fbclid=IwAR1KBQdioWCIq1BbRQdO1M8sAtkixDJH4NiIzp9vOA5W5CMCwVSspf-vuTg

    var xx =  sinC*sinB*sinA*cosD+cosC*cosA*cosD;
    var xy =  sinE*sinD*sinC*sinB*sinA+cosA*sinE*sinD*cosA+sinA*cosB*cosE
    var xz = cosC*sinB*sinA*cosF-sinC*cosA*cosF-sinE*sinA*cosB*sinF+sinD*sinC*sinB*sinA*sinF*cosE+cosC*sinD*cosA*sinF*cosE
    var xw =  -sinE*sinA*cosB*cosF-cosC*sinB*sinA*sinF+sinC*cosA*sinF+sinD*sinC*sinB*sinA*cosF*cosE+cosC*sinD*cosA*cosF*cosE
    
    var yx = -cosC*sinA*cosD+sinC*sinB*cosA*cosD
    var yy = -cosC*sinE*sinD*sinA+sinE*sinD*sinC*sinB*cosA+cosB*cosA*cosE
    var yz = sinC*sinA*cosF+cosC*sinB*cosA*cosF-sinE*cosB*cosA*sinF-cosC*sinD*sinA*sinF*cosE+sinD*sinC*sinB*cosA*sinF*cosE
    var yw = -sinE*cosB*cosA*cosF-sinC*sinA*sinF-cosC*sinB*cosA*sinF-cosC*sinD*sinA*cosF*cosE+sinD*sinC*sinB*cosA*cosF*cosE
     
    var zx =  sinC*cosB*cosD	
    var zy = sinE*sinD*sinC*cosB-sinB*cosE	        
    var zz = cosC*cosB*cosF+sinE*sinB*sinF+sinD*sinC*cosB*sinF*cosE	 
    var zw = sinE*sinB*cosF-cosC*cosB*sinF+sinD*sinC*cosB*cosF*cosE
      
    var wx =  -sinD
    var wy =  sinE*cosD
    var wz = cosD*sinF*cosE
    var ww =  cosF*cosD*cosE
   
    
    var result = [];
  
    for(let i = 0; i < points.length; i++) {
        let x = xx*points[i].x + xy*points[i].y + xz*points[i].z + xw*points[i].w;
        let y = yx*points[i].x + yy*points[i].y + yz*points[i].z + yw*points[i].w;
        let z = zx*points[i].x + zy*points[i].y + zz*points[i].z + zw*points[i].w;
        let w = wx*points[i].x + wy*points[i].y + wz*points[i].z + ww*points[i].w;
      
        // W usually is (-1.41;1.41) so im making it always positive, and then scale it a little down
        w += 2;
        w/=2.0;
      
        var vec3 = {x:x*w,y:y*w,z:z*w};
        result.push(vec3);
    }

    return result;
}