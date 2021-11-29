import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  constructor(private recipeService: RecipeService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params)=>{
      this.recipe = this.recipeService.getSingleRecipe(+params['id'])
    })
  }

  onAddToList(){
    this.recipeService.addIngridientsToList(this.recipe.ingredients)
  }

  onEdit(){
    this.router.navigate(['edit'],{relativeTo: this.route})
  }

}
