//  <mgl-layer id="listings-layer" type="symbol" source="listings-tags" [paint]="{ 'text-color': '#ffffff'}"
//         [layout]="layout"></mgl-layer>

//  <mgl-layer [id]="listingsLayer.id" type="symbol" [paint]="listingsLayer.paint" [layout]="listingsLayer.layout"
//         [source]="source">
// </mgl-layer> 

// Use this event to load new listings wehen map zooms ends 
// boxZoomEnd: MapBoxZoomEvent 

// Use this to overlay a custom image in the map 
// <mgl-image id="image" url="https://..." (loaded)="imageLoaded = true">
//         ...
//         <mgl-image id="image2" [data]="{
//        width: 64,
//        height: 64,
//        data: imageData
//      }"> 



// Marker Options 
// offset: PointLike
// anchor: 'center' | 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
// pitchAlignment: map | viewport | auto
// rotationAlignment: map | viewport | auto
// Dynamic:

// lngLat: LngLatLike
// draggable: boolean
// [ngx] feature: GeoJSON.Feature<GeoJSON.Point> Mutually exclusive with lngLat
// [ngx] className string Class name to aply to the container
// [ngx] popupShown: boolean Shows if the marker's popup is visible at the moment

// Outputs
// markerDragStart: Marker
// markerDrag: Marker
// markerDragEnd: marker 

// @Input() projection: Projection = {
//   name: 'globe',
//   center: [35, 55],
//   parallels: [20, 60]
// };


// <mgl-marker #myMarker [lngLat]="[-74.5, 40]">
// <div (click)="null" class="marker">
//     <button class="
//     rounded-full 
//     bg-white 
//     text-slate-950 
//     font-semibold 
//     text-base
//     flex
//     items-center
//     justify-center
//     py-1
//     px-2
//     shadow-md
//     gap-1
//     ">
//         <span>${{listing.price}}</span>
//         <span class="text-sm">MXN</span>
//     </button>
// </div>
// </mgl-marker> 


const layout = {
        'text-field': '{point_count_abbreviated}',
        'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
        'text-size': 16,
        'icon-size': 0.4,
        'icon-image': 'clusterMarker'
};

const listingsLayer = {
        id: 'clusters',
        type: 'symbol',
        paint: {
                'text-color': '#ffffff',
        },
        layout: {
                'text-field': '{point_count_abbreviated}',
                'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
                'text-size': 16,
                'icon-size': 0.4,
                'icon-image': 'clusterMarker'
        },
};
