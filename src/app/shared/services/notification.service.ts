import { LoadingController } from '@ionic/angular';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  public ion_loading : HTMLIonLoadingElement;

  constructor(/*public mat_snack_bar: MatSnackBar,*/
              public loadingCtrl : LoadingController) { }

  //Angular Material Components
  customSnackBar(message: string, action: string, class_name: string, duration = 7000) {
    return /*this.mat_snack_bar.open(message,
                                   action,{
                                            duration: duration,
                                            verticalPosition: 'bottom',
                                            horizontalPosition: 'center',
                                            panelClass: [class_name],
                                          }
                                  );*/
  }

  //Ionic Components
  async presentIonLoading(message : string = "aguarde..."){
    let loading = await this.loadingCtrl.create({message : message});
    this.ion_loading = loading;
    await this.ion_loading.present();
  }

  async hideIonLoading(){
    await this.loadingCtrl.dismiss();
  }
}
