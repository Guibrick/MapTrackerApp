using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
//using GoogleMaps.LocationServices;
using MapTrackerApp.Data;
using MapTrackerApp.Models;

namespace MapTrackerApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PackagesController : ControllerBase
    {
        private readonly MapContext _context;

        public PackagesController(MapContext context)
        {
            _context = context;
        }

        // GET: api/Packages
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Package>>> GetPackages()
        {
            return await _context.Packages.ToListAsync();
        }

        // GET: api/Packages/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Package>> GetPackage(int id)
        {
            var package = await _context.Packages.FindAsync(id);

            if (package == null)
            {
                return NotFound();
            }

            return package;
        }

        // PUT: api/Packages/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPackage(int id, Package package)
        {
            if (id != package.DeliveryId)
            {
                return BadRequest();
            }

            _context.Entry(package).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PackageExists(id))
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

        // POST: api/Packages
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Package>> PostPackage(Package package)
        {

            /*        _context.Add(new Destination()
        {
            Id = Guid.NewGuid().ToString(),
            City = destination.City,
            Country = destination.Country,
            Latitud = destination.Latitud,
            Longitud = destination.Longitud,
            Date = destination.Date,
            Image = destination.Converter(destination.Image),
        });
        _context.SaveChanges();*/

            /*   var address = "75 Ninth Avenue 2nd and 4th Floors New York, NY 10011";


     /*/
            /*var locationService = new GoogleLocationService();
            var point = locationService.GetLatLongFromAddress(package.StreetName);
            var extractedLatitude = point.Latitude;
            var extractedLongitude = point.Longitude;*/



            _context.Packages.Add(new Package()
            {
                DeliveryId = package.DeliveryId,
                Product = package.Product,
                ProductType = package.ProductType,
                Size = package.Size,
                LastName = package.LastName,
                FirstName = package.FirstName,
                StreetName = package.StreetName,
                StreetNumber = package.StreetNumber,
                Zip = package.Zip,
                City = package.City,
                //Latitude = extractedLatitude,
                //Longitude = extractedLongitude,
                Latitude = package.Latitude,
                Longitude = package.Longitude,
            });
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (PackageExists(package.DeliveryId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetPackage", new { id = package.DeliveryId }, package);
        }

        // DELETE: api/Packages/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePackage(int id)
        {
            var package = await _context.Packages.FindAsync(id);
            if (package == null)
            {
                return NotFound();
            }

            _context.Packages.Remove(package);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PackageExists(int id)
        {
            return _context.Packages.Any(e => e.DeliveryId == id);
        }
    }
}
