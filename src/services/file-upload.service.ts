import { Injectable } from '@angular/core';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class FileUploadService {

    // private baseUrl = '/api'; //use a proxy - set in ionic.config.json
	private baseUrl = 'http://81.169.165.110:1099/videobay/api';
    
    constructor(private transfer: FileTransfer) { }

    uploadVideo(file: any, advertId: number): Promise<boolean> {
        const fileTransfer: FileTransferObject = this.transfer.create();
        let options: FileUploadOptions = {
            fileKey: 'file',
            fileName: file.fullPath.substr(file.fullPath.lastIndexOf('/') + 1),
            mimeType: 'video/mp4',
            headers: {}
        }

        return new Promise(resolve => {
            fileTransfer.upload(file.fullPath, encodeURI(this.baseUrl + '/uploads/' + advertId), options)
                .then((data) => {
                    console.log(data);
                    resolve(true);
                }, (err) => {
                    console.log(err);
                    resolve(false);
                }
            );
        });
    }
}
