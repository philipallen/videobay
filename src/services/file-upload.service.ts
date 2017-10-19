import { Injectable } from '@angular/core';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';

@Injectable()
export class FileUploadService {

    // private baseUrl = '/api'; //use a proxy - set in ionic.config.json
	private baseUrl = 'http://81.169.165.110:1099/videobay/api';
    
    constructor(private transfer: FileTransfer) { }

    uploadVideoCordova(file: any, advertId: number): Promise<boolean> {
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

    uploadVideoDesktop(file: any, advertId: number): Promise<any> {
        return new Promise((resolve, reject) => {
            let xhr:XMLHttpRequest = new XMLHttpRequest();
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 201) {
                        resolve(JSON.parse(xhr.response));
                    } else {
                        reject(xhr.response);
                    }
                }
            };
    
            xhr.open('POST', this.baseUrl + '/uploads/' + advertId, true);
    
            let formData = new FormData();
            formData.append("file", file, "file");
            xhr.send(formData);
        });
    }
}
