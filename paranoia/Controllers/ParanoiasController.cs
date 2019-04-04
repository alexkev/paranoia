using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using paranoia.Models;

namespace paranoia.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ParanoiasController : ControllerBase
    {
        private readonly ParanoiaContext _context;

        public ParanoiasController(ParanoiaContext context)
        {
            _context = context;
        }

        // GET: api/Paranoias
        [HttpGet]
        public IEnumerable<Paranoia> GetParanoia()
        {
            return _context.Paranoia;
        }

        // GET: api/Paranoias/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetParanoia([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var paranoia = await _context.Paranoia.FindAsync(id);

            if (paranoia == null)
            {
                return NotFound();
            }

            return Ok(paranoia);
        }

        // PUT: api/Paranoias/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutParanoia([FromRoute] int id, [FromBody] Paranoia paranoia)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != paranoia.Id)
            {
                return BadRequest();
            }

            _context.Entry(paranoia).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ParanoiaExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Paranoias
        [HttpPost]
        public async Task<IActionResult> PostParanoia([FromBody] Paranoia paranoia)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Paranoia.Add(paranoia);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetParanoia", new { id = paranoia.Id }, paranoia);
        }

        // DELETE: api/Paranoias/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteParanoia([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var paranoia = await _context.Paranoia.FindAsync(id);
            if (paranoia == null)
            {
                return NotFound();
            }

            _context.Paranoia.Remove(paranoia);
            await _context.SaveChangesAsync();

            return Ok(paranoia);
        }

        private bool ParanoiaExists(int id)
        {
            return _context.Paranoia.Any(e => e.Id == id);
        }
    }
}