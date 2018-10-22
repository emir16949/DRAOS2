import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../services/event/event.service';
import { CommentService } from '../services/comment/comment.service';
import { GradeService } from '../services/grade/grade.service';
import { Comment } from '../services/comment/Comment';
import { Grade } from '../services/grade/Grade';
import { TokenStorage } from '../core/token.storage';
import { User } from '../services/user/User';
import { UserService } from '../services/user/user.service';


@Component({
  selector: 'app-muzika-detalji',
  templateUrl: './muzika-detalji.component.html',
  styleUrls: ['./muzika-detalji.component.css']
})
export class MuzikaDetaljiComponent implements OnInit {

  event: any;
  eventId: any;
  comments: Array<any>;
  selectedComment: any;

  comment: any;

  averageGrade: any;

  newComment: Comment = {
    comment: '',
    user: {
      id: null
    },
    event: {
      id: null
    }
  };

  newGrade: Grade = {
    grade: 1,
    user: {
      id: null
    },
    event: {
      id: null
    }
  };

  noviKomentar: any;
  loggedUser: any;

  user: User = {
    id: null,
    username: '',
    password: '',
    email: '',
    ime: '',
    prezime: '',
    user_role: {
      id: 2,
    }
  };

  odabranaOcjena: any;
  imaOcjenu: any;
  ocjene = [{ id: 5, name: '5 - Najbolji provod' }, { id: 4, name: '4 - Odličan provod' }, { id: 3, name: '3 - Neutralan sam' }, { id: 2, name: '2 - Nisam oduševljen' }, { id: 1, name: '1 - Loš događaj ' }];



  constructor(
    private eventService: EventService,
    private router: ActivatedRoute,
    private commentService: CommentService,
    private gradeService: GradeService,
    private userService: UserService) { }


  ngOnInit() {
    const id = +this.router.snapshot.paramMap.get('id');
    this.eventId = id;
    this.getEvent();
    this.getComments(id);

    this.gradeService.getAverageGrade(id).subscribe(data => {
      if (!isNaN(data))
        this.averageGrade = data;
      else
        this.averageGrade = "Nije još ocijenjen";
    });

    this.getUserData();

    this.checkGrade();
  }

  getUserData() {

    this.loggedUser = TokenStorage.getCurrentUser();

    this.userService.getByUsername(this.loggedUser).subscribe(data => {
      this.user = data;
    });
  }

  getEvent() {
    const id = +this.router.snapshot.paramMap.get('id');

    this.eventId = id;

    this.eventService.getEvent(id).subscribe(data => {
      this.event = data;
    });
  }

  getComments(id) {
    this.commentService.getCommentsForEvent(id).subscribe(data => {
      console.log("aaaaaa");
      this.comments = data;
      console.log(this.comments.length);
    });
  }

  createComment() {
    this.newComment.user.id = this.user.id;
    this.newComment.event.id = this.eventId;
    this.newComment.comment = this.noviKomentar;

    this.commentService.createComment(this.newComment).subscribe(data => {
      window.location.reload();
    });
    this.noviKomentar = '';
  }

  addNewGrade() {
    this.newGrade.user.id = this.user.id;
    this.newGrade.event.id = this.eventId;
    this.newGrade.grade = parseInt(this.odabranaOcjena);

    if (this.imaOcjenu == false) {
      this.gradeService.createGrade(this.newGrade).subscribe(data => {
        window.location.reload();
      });
    }
    else {
      this.gradeService.updateGrade(this.newGrade).subscribe(data => {
        window.location.reload();
      });
    }
    this.odabranaOcjena = '';
  }

  checkGrade() {
    this.gradeService.getGradeByUserId(this.loggedUser, this.eventId).subscribe(data => {
      if (data == null)
        this.imaOcjenu = false;
      else
        this.imaOcjenu = true;
    });
  }
}
