import { Injectable, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'

import { Todo } from '../models/Todo'

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'aplication/json'
  })
}


@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todoUrl:string = 'https://jsonplaceholder.typicode.com/todos';
  todosLimit = '?_limit=5';


  constructor(private http:HttpClient) { }

  // Get todos
  getTodos():Observable<Todo[]>{
    return this.http.get<Todo[]>(`${this.todoUrl}${this.todosLimit}`);
  }

  // Toggle completed
  toggleCompleted(todo:Todo):Observable<any> {
    const url = `${this.todoUrl}/${todo.id}`;
    return this.http.put(url, todo, httpOptions);
  }

  // Delete Todo
  deleteTodo(todo:Todo):Observable<Todo> {
    const url = `${this.todoUrl}/${todo.id}`;
    return this.http.delete<Todo>(url, httpOptions);
  }

  // Add Todo
  addTodo(todo:Todo):Observable<Todo> {
    return this.http.post<Todo>(this.todoUrl, todo, httpOptions);
  }
}
