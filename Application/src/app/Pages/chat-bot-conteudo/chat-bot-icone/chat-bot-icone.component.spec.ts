import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatBotIconeComponent } from './chat-bot-icone.component';

describe('ChatBotIconeComponent', () => {
  let component: ChatBotIconeComponent;
  let fixture: ComponentFixture<ChatBotIconeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatBotIconeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChatBotIconeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
