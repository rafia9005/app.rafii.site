import Home from "@/pages";
import { describe, it } from "node:test";
import { render } from "@testing-library/react";

describe('Pages Pages', () => {
  it('render Pages', () => {
    const page = render(<Home />);
  })
})
