document.addEventListener('DOMContentLoaded', function() {
    let modalButtons = document.querySelectorAll('.js__open__modal'),
        overlay      = document.querySelector('#overlay__modal'),
        closeButtons = document.querySelectorAll('.js__close__modal');

    /* открытие окон. */
    modalButtons.forEach(function(item){
  
       item.addEventListener('click', function(e) {
  
          e.preventDefault();
  
          let modalId = this.getAttribute('data-modal'),
              modalElem = document.querySelector('.modal[data-modal="' + modalId + '"]');

          modalElem.classList.add('active');
          overlay.classList.add('active');
  
       }); // end click
    }); // end foreach
  
    /* закрытие окон */
    closeButtons.forEach(function(item){

      item.addEventListener('click', function(e) {
        
        let parentModal = this.closest('.modal');

        parentModal.classList.remove('active');
        overlay.classList.remove('active');
      });
  
    }); // end foreach
  
    /* закрытие по ESC */
    document.body.addEventListener('keyup', function (e) {
      let key = e.keyCode;
  
      if (key == 27) {
          document.querySelector('.modal.active').classList.remove('active');
          document.querySelector('.overlay.active').classList.remove('active');
      };
    }, false);
  
    /* скрытие окна при клике на подложку */
    overlay.addEventListener('click', function() {
      document.querySelector('.modal.active').classList.remove('active');
      this.classList.remove('active');
    });
  
  }); // end ready