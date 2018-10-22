import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category/category.service';
import { Category } from '../services/category/Category';

@Component({
  selector: 'app-admin-kategorije',
  templateUrl: './admin-kategorije.component.html',
  styleUrls: ['./admin-kategorije.component.css']
})
export class AdminKategorijeComponent implements OnInit {

  categories: any;
  category: Category = {
    id: null,
    name: '',
    description: ''
  }

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.getAllCategories();
  }

  getAllCategories() {
    this.categoryService.getAllCategory().subscribe(data => { this.categories = data });
  }

  prikaziDetalje(category) {
    this.category.id = category.id;
    this.category.name = category.name;
    this.category.description = category.description;
  }

  obrisiKategoriju(category) {
    this.categoryService.deleteCategory(this.category);
  }

  sacuvajIzmjeneCategory() {
    this.categoryService.editCategory(this.category).subscribe(data => console.log(data));
    window.location.reload();
  }

  zatvori() {
    window.location.reload();
  }


}
