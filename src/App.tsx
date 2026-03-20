/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Layout } from "./components/Layout"
import { Home } from "./pages/Home"
import { ProjectLINA } from "./pages/ProjectLINA"
import { ProjectINK } from "./pages/ProjectINK"
import { ProjectResearch } from "./pages/ProjectResearch"
import { ProjectMusthane } from "./pages/ProjectMusthane"
import { About } from "./pages/About"
import { NotFound } from "./pages/NotFound"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="ink" element={<ProjectINK />} />
          <Route path="lina" element={<ProjectLINA />} />
          <Route path="research" element={<ProjectResearch />} />
          <Route path="musthane" element={<ProjectMusthane />} />
          <Route path="about" element={<About />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
