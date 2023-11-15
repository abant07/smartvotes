import Link from 'next/link';

const Home = () => (
  <section className='w-full flex-center flex-col margin'>
    <h1 className='head_text text-center'>
      Discover Smart Voting
      <br className='max-md:hidden' />
      <span className='greenyellow_gradient text-center'> Voting Made Secure</span>
    </h1>
    <p className='desc text-center margin'>
      Choose who you would like to lead your student body!
    </p>

    <div className='sm:flex hidden btn-below margin items-center justify-center'>
      <Link href="/votingPage">
        <button
          type='button'
          className='green_btn contract'
        >
          Start Voting
        </button>
      </Link>
    </div>
  </section>
);

export default Home;
