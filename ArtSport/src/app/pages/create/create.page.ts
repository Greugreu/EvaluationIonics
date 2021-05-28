import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {GradeService} from "../../services/grade.service";
import {LocationModel} from "../../models/location";
import {ArtItems} from "../../models/art-items";
import {ArtItemService} from "../../services/art-item.service";

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {

  itemForm: FormGroup;
  grades: Array<number>;
  submited: boolean = false;
  loader: boolean = false;
  private nativePicture: string;

  constructor(public formBuilder: FormBuilder,
              public router: Router,
              public gradeService: GradeService,
              public artItemService: ArtItemService,
              ) { }

  ngOnInit() {
    this.grades = this.gradeService.getAll();
    this.buildForm();
  }

  buildForm(){
    this.itemForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      image: [''],
      nativeImage: [''],
      note: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
      grade: ['', [Validators.required]],
    }, {
      validator: this.validateImage('image', 'nativeImage'),
    });
  }

  save(){
    this.submited = true;
    if(!this.itemForm.valid){
      return;
    }
    this.loader = true;

    let values = this.itemForm.value;
    let image = this.nativePicture ? this.nativePicture : values['image'];

    let location = new LocationModel(values['address']);
    let place = new ArtItems(
      values['name'],
      values['note'],
      location,
      image,
      new Date()
    );

    this.artItemService.add(place).subscribe(place => {
      this.router.navigate(['/show', place.id]);
    }).add(() => {
      this.loader = false;
    });
  }

  getForm(){
    return this.itemForm.controls;
  }

  validateImage(form: string, native: string){
    return (formGroup: FormGroup) => {
      let image = formGroup.controls[form];
      let nativeImage = formGroup.controls[native];

      if(nativeImage.value){
        return image.setErrors(null);
      }

      let regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
      if(image.value && regex.test(image.value)){
        return image.setErrors(null);
      }

      return image.setErrors({noImage: true});
    };
  }

}
