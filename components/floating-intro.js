document.addEventListener('DOMContentLoaded', function() {
  const floatingIntro = document.querySelector('.floating-intro');
  if (!floatingIntro) return;

  // Check if box has been dismissed in this session
  if (sessionStorage.getItem('floatingIntroDismissed') === 'true') {
    floatingIntro.style.display = 'none';
    return;
  }

  let initialScrollY = window.scrollY;

  function handleClick(e) {
    dismiss();
  }

  function handleOutsideClick(e) {
    // Check if the click was outside the floating intro
    if (!floatingIntro.contains(e.target)) {
      dismiss();
    }
  }

  function dismiss() {
    // Save dismissal state to sessionStorage
    sessionStorage.setItem('floatingIntroDismissed', 'true');
    
    floatingIntro.classList.add('dismissed');
    setTimeout(() => {
      floatingIntro.style.display = 'none';
    }, 300);
  }

  // Scroll threshold detection
  function handleScroll() {
    const scrollDistance = Math.abs(window.scrollY - initialScrollY);
    if (scrollDistance > 150) {
      dismiss();
      window.removeEventListener('scroll', handleScroll);
    }
  }

  // Event listeners
  floatingIntro.addEventListener('click', handleClick);
  
  // Click outside to dismiss
  document.addEventListener('click', handleOutsideClick);
  
  // Scroll event to dismiss the box
  window.addEventListener('scroll', handleScroll);
});
