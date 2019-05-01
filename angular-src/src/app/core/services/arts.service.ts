import { Injectable } from '@angular/core';
import { ArtWork } from "../model/art-work";

@Injectable({
  providedIn: 'root'
})
export class ArtsService {

  constructor() { }

  /**
   * Convert from source ArtWork[] of type sType to a 1*4 matrix of strings (one row four columns).
   * Each column in the matrix represents a column of image sources.
   * @param aInput - an array of objects
   * @returns {ArtWork[][]}
   */
  public createSourcesGrid(aInput){
    let iColumnsCount = 4;
    let iCurrentColumn = 0;
    let aColumns = [
      [],
      [],
      [],
      []
    ];

    // Go over array
    for (let i = 0; i < aInput.length; i++) {
      // Get the correct column number
      iCurrentColumn = i % iColumnsCount;
      // Push image into column
      aColumns[iCurrentColumn].push(aInput[i]);
    }
    return aColumns;
  }

  /**
   * Convert an array of imageModel objects as received from the dataBase into an array of ArtWorks
   * imageModel:
   * {
   *    'name': name,
   *    'type': type,
   *    'dimensions': {
   *      'height': height,
   *      'width': width
   *    }
   * }
   * @param aInput
   * @returns {ArtWork[]}
   */
  public convertToArtItems(aInput) {
    let aMappedInput;
    aMappedInput = aInput.map(item => {
      let itemPath = ['..', '..', 'assets', 'images', item.imageType, item.imageName].join('/'),
          image = new Image();
      image.src = itemPath;
      return new ArtWork(item.imageName, item.imageType, itemPath, item.imageDimensions.height,
        item.imageDimensions.width, image);
    });
    return aMappedInput;
  }
}
