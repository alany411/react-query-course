import { Route, Routes } from 'react-router-dom';

import Container from '@/components/Container';
import FetchingIndicator from '@/components/FetchingIndicator';
import AddIssue from '@/pages/AddIssue';
import Issue from '@/pages/Issue';
import Issues from '@/pages/Issues';

function App() {
  return (
    <Container>
      <Routes>
        <Route path='/' element={<Issues />} />
        <Route path='/add' element={<AddIssue />} />
        <Route path='/issue/:number' element={<Issue />} />
      </Routes>
      <FetchingIndicator />
    </Container>
  );
}

export default App;
