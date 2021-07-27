import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  public ion_loading : HTMLIonLoadingElement;

  constructor(/*public mat_snack_bar: MatSnackBar,*/
              public loadingCtrl : LoadingController,
              public toastController : ToastController) { }

  async presentIonLoading(message : string = "aguarde..."){
    let loading = await this.loadingCtrl.create({message : message});
    this.ion_loading = loading;
    await this.ion_loading.present();
  }

  async hideIonLoading(){
    await this.loadingCtrl.dismiss();
  }

  async presentIonToast(message: string, duration: number = 3000, color : string = 'primary'){
    const toast = await this.toastController.create({
      message: message,
      duration: duration,
      position: 'bottom',
      cssClass: 'animated fadeInUp',
      animated: true,
      color: color,
      buttons: [
        {
          side: 'end',
          role: 'cancel',
          text: 'fechar',
          handler: () => {
           //
          }
        }
      ]
    });
    toast.present();
  }
}
