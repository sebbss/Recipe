import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shoppingList.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem:Ingredient;

  @ViewChild('f') slForm : NgForm;


  constructor(private slService: ShoppingListService) { }

  ngOnInit(): void {
    this.subscription = this.slService.startedEditing.subscribe(
      (i:number)=>{
        this.editedItemIndex = i;
        this.editMode = true;
        this.editedItem = this.slService.getIngredient(i)
        this.slForm.setValue({
          name:this.editedItem.name,
          amount: this.editedItem.amount
        })
      }
    )
  }

  onAdd(form: NgForm) {
    const value = form.value
    const ingredient = new Ingredient(
      value.name,
      value.amount)
    if(this.editMode){
      this.slService.updateIngredient(this.editedItemIndex, ingredient)
    }else{
      this.slService.addIgredient(ingredient);
    }
    this.editMode = false;
    form.reset()

  }

  clear(){
    this.slForm.reset();
    this.editMode = false;
  }
  onDelete(){
    this.slService.deleteIngredient(this.editedItemIndex)
    this.clear()
  }
  ngOnDestroy(){
    this.subscription.unsubscribe()

  }
}
